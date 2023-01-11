import { gql, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'

const useUserApi = () => {
  const { data } = useSubscription(
    gql`
      subscription MySubscription {
        users {
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
    `
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

  return {
    users,
  }
}

export default useUserApi
