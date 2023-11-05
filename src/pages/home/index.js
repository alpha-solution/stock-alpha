import { useSession } from 'next-auth/react';

export default function Home() {
    const { data: session } = useSession();
    console.log(session);

    return (
        <div>
            Home page logged in as {`${session.user.name.first_name}`}
        </div>
    );
}