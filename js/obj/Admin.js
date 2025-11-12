import { User } from './User.js';

class Admin extends User {
    constructor(name, email, pass, role = 'admin') {
        super(name, email, pass);
        this.role = role;
    }

    async crearUsuario() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const pass = document.getElementById("pass").value;

        const u = new User(name, email, pass);

        try {
            const conn = await fetch("https://691488943746c71fe0489e1c.mockapi.io/api/users/users", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(u)
            });

            if (!conn.ok) {
                console.error('Error al crear usuario:', conn.status, await conn.text());
                return;
            }

            const result = await conn.json();
            console.log('Usuario creado:', result);
        } catch (err) {
            console.error('Fetch error:', err);
        }
    }

    async deleteUser(userId) {
        try {
            const conn = await fetch(`https://691488943746c71fe0489e1c.mockapi.io/api/users/users/${userId}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' }
            });

            if (!conn.ok) {
                console.error('Error al eliminar:', conn.status);
                return;
            }

            console.log('Usuario eliminado');
        } catch (err) {
            console.error('Error:', err);
        }
    }

    // Método ejemplo: actualizar usuario
    async updateUser(userId, updatedData) {
        try {
            const conn = await fetch(`https://691488943746c71fe0489e1c.mockapi.io/api/users/users/${userId}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (!conn.ok) {
                console.error('Error al actualizar:', conn.status);
                return;
            }

            const result = await conn.json();
            console.log('Usuario actualizado:', result);
        } catch (err) {
            console.error('Error:', err);
        }
    }

    // falta adm rooms y reservas
}

export { Admin };
