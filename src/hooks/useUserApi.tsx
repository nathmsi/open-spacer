import { gql, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import { client } from '../utils/graphql'

const useUserApi = () => {
  const { data: maisonList } = useSubscription(
    gql`
      subscription MyQuery {
        maison {
          id
          name
          updated_at
          created_at
        }
      }
    `
  )

  const [maisonSelected, setMaisonSelected] = useState([])

  const { data } = useSubscription(
    gql`
      subscription MySubscription($maisonIds: [uuid!]!) {
        users(where: { maison_id: { _in: $maisonIds } }) {
          email
          fullName
          id
          created_at
          maison_id
          updated_at
          userRoleId
          maison {
            name
            id
          }
          role {
            name
            id
          }
        }
      }
    `,
    {
      variables: {
        maisonIds: maisonSelected,
      },
    }
  )
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (data?.users) {
      setUsers(
        data?.users.map((user) => ({
          ...user,
          name: user.fullName,
          email: user.email,
          role: user.role?.name,
          maison: user.maison?.name,
        }))
      )
    }
  }, [data])

  const handleChangMaison = (val) => {
    console.log(val)
    setMaisonSelected(val.map((el) => el.id))
  }

  const deleteUser = ({ id }) => {
    console.log(id)
    const res = client.query({
      query: gql`
        mutation MyMutation($id: uuid) {
          delete_users(where: { id: { _eq: $id } }) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        id,
      },
    })
  }

  return {
    users,
    maisonsList: maisonList?.maison,

    handleChangMaison,
    deleteUser,
  }
}

export default useUserApi
