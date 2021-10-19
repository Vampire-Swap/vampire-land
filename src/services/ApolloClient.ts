import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client/core'

// Cache implementation
const cache = new InMemoryCache()

export function getApolloClient(uri: string): ApolloClient<NormalizedCacheObject> {
    // HTTP connection to the API
    const httpLink = createHttpLink({
        // You should use an absolute URL here
        uri: uri,
    })

    // Create the apollo client
    return new ApolloClient({
        link: httpLink,
        cache,
    })
}