export class UsersClass {
    async addUser({
        username,
        email,
        password,
        avatar,
    }: {
        username: string;
        email: string;
        password?: string;
        avatar?: string;
    }) {
        return await fetch("http://localhost:3000/api/users?type=create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                username,
                email,
                password: password ? password : null,
                avatar: avatar ? avatar : "",
            }),
        });
    }
}
