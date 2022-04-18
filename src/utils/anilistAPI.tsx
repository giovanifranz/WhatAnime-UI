export async function anilistAPI(anilistId: number) {
  let animeName = ''
  const query = `
    query ($id: Int) { # Define which variables will be used in the query (id)
      Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
        id
        title {
          romaji
        }
      }
    }
    `
  const variables = {
    id: anilistId,
  }

  const url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    }

  await fetch(url, options)
    .then((response) => response.text())
    .then((responseBody) => {
      animeName = JSON.parse(responseBody).data.Media.title.romaji
    })

  return animeName
}
