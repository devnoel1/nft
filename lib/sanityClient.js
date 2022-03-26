import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'kcjshy7y',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skoXB23mktjDoMRSE0yxc2rznsXNYlZsLWlob5c6XfLA3tJLL7WNqWbBE53jRrVhUgeWLShpmjFyuv2CHvRlnqSAYbulqN6DCtTjbcy2xI0BIN8TYZ9yRHGiKVmfJLty5SSJUDm2bJNRoNcRKOGLoIZYdXS0PDeBfB2e5MIQWKE8k7BoF9nG',
  useCdn: false,
})
