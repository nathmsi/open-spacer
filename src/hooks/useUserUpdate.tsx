import { useState } from 'react'
import { client } from '../utils/graphql'
import { gql } from '@apollo/client'

const useUserUpdate = () => {
  const [loading, setLoading] = useState(false)

  const createNewUser = async ({ fullName, maison, role, email }) => {
    setLoading(true)
    const data = client.query({
      query: gql`
        mutation MyMutation($dataToSend: [users_insert_input!]!) {
          insert_users(objects: $dataToSend) {
            returning {
              id
            }
          }
        }
      `,
      variables: {
        dataToSend: [
          {
            fullName,
            maison_id: maison,
            userRoleId: role,
            email,
          },
        ],
      },
    })
    setLoading(false)
  }

  return {
    createNewUser,
    loading,
  }
}

export default useUserUpdate
