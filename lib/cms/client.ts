type GraphQLError = {
  message: string;
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLError[];
};

export class CmsFetchError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly graphQLErrors?: GraphQLError[],
  ) {
    super(message);
    this.name = "CmsFetchError";
  }
}

export async function cmsFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const url = process.env.WORDPRESS_API_URL;

  if (!url) {
    throw new CmsFetchError(
      "WORDPRESS_API_URL is not set. Add it to .env.local (see .env.example).",
    );
  }

  let response: Response;

  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown network error";
    throw new CmsFetchError(`CMS request failed: ${message}`);
  }

  if (!response.ok) {
    throw new CmsFetchError(
      `CMS request failed with status ${response.status}`,
      response.status,
    );
  }

  let json: GraphQLResponse<T>;

  try {
    json = (await response.json()) as GraphQLResponse<T>;
  } catch {
    throw new CmsFetchError("CMS response was not valid JSON");
  }

  if (json.errors?.length) {
    throw new CmsFetchError(
      json.errors.map((e) => e.message).join("; "),
      response.status,
      json.errors,
    );
  }

  if (json.data === undefined || json.data === null) {
    throw new CmsFetchError("CMS response contained no data");
  }

  return json.data;
}
