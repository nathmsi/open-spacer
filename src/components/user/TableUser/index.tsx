import { DataGrid } from '@mui/x-data-grid'
import useUserApi from '../../../hooks/useUserApi'

export default function BasicEditingGrid() {
  const { users } = useUserApi()
  console.log({ users })
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  )
}

const columns = [
  { field: 'name', headerName: 'Name', editable: true, with: '100%' },
  { field: 'email', headerName: 'Email', type: 'text', editable: true },
  { field: 'role', headerName: 'Role', type: 'text', editable: true },
  { field: 'maison', headerName: 'Maison', type: 'text', editable: true },
]
