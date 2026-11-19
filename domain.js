
export const MAX_TASKS = 1000;

export const STATUSES = ["new", "doing", "done"];
export const PRIORITIES = ["low", "normal", "high"];

export function validateTasks(data) {
    if (!Array.isArray(data)) {
        throw new Error("Dane muszą być tablicą!");
    }

    if (data.length > MAX_TASKS) {
        throw new Error("Maksymalna liczba zgłoszeń to 1000!");
    }

    const ids = new Set();

    return data.map(task => {
        if (
            task === null ||
            typeof task !== "object" ||
            Array.isArray(task)
        ) {
            throw new Error("Zgłoszenie musi być obiektem!");
        }

        const { id, title, status, priority } = task;

        if (typeof id !== "string" || id.trim() === "") {
            throw new Error("Niepoprawne ID zgłoszenia!");
        }

        if (ids.has(id)) {
            throw new Error("Wykryto duplikat ID!");
        }

        ids.add(id);

        if (
            typeof title !== "string" ||
            title.trim().length < 3 ||
            title.trim().length > 80
        ) {
            throw new Error("Tytuł musi mieć od 3 do 80 znaków!");
        }

        if (!STATUSES.includes(status)) {
            throw new Error("Niepoprawny status zgłoszenia!");
        }

        if (!PRIORITIES.includes(priority)) {
            throw new Error("Niepoprawny priorytet zgłoszenia!");
        }

        return {
            id,
            title: title.trim(),
            status,
            priority
        };
    });
}

export function addTask(tasks, title, priority) {
    if (tasks.length >= MAX_TASKS) {
        throw new Error("Nie można dodać więcej niż 1000 zgłoszeń!");
    }

    if (
        typeof title !== "string" ||
        title.trim().length < 3 ||
        title.trim().length > 80
    ) {
        throw new Error("Tytuł musi mieć od 3 do 80 znaków!");
    }

    if (!PRIORITIES.includes(priority)) {
        throw new Error("Niepoprawny priorytet!");
    }

    const newTask = {
        id: crypto.randomUUID(),
        title: title.trim(),
        status: "new",
        priority
    };

    return [...tasks, newTask];
}

export function changeTaskStatus(tasks, id, newStatus) {
    if (!STATUSES.includes(newStatus)) {
        throw new Error("Niepoprawny status zgłoszenia!");
    }

    if (!tasks.some(task => task.id === id)) {
        throw new Error("Nie znaleziono zgłoszenia!");
    }

    return tasks.map(task =>
        task.id === id
            ? { ...task, status: newStatus }
            : task
    );
}

export function deleteTask(tasks, id) {
    if (!tasks.some(task => task.id === id)) {
        throw new Error("Nie znaleziono zgłoszenia!");
    }

    return tasks.filter(task => task.id !== id);
}
