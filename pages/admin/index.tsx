import { useSession, signIn, signOut } from "next-auth/react"

const AdminPage = () => {
    const { data: session } = useSession()

    return (
        <div>
        <h1>Admin Page</h1>
        <button onClick={() => signIn()}>Sign In</button>
        </div>
    );
};

export default AdminPage;