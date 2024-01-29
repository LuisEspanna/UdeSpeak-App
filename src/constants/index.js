const COLLECTIONS = {
    USERS: 'users',
    PERMISSIONS: 'permissions',
    ACCESS_KEYS: 'access-keys',
    COUNTERS: 'counters',
    LEVELS: 'levels',
    LANGUAGES: 'languages',
    GROUPS: 'groups',
    QUESTIONNARIES: 'questionnaries',
    QUESTIONS: 'questions',
    SERVERS: 'servers',
    NEWS: 'news'
}

const PERMISSIONS = {
    ADMIN: 'Administrador',
    TEACHER: 'Docente',
    STUDENT: 'Estudiante'
}

const QUESTIONS_TYPE = {
    LISTENING: 'listening',
    READING: 'reading',
    SPEAKING: 'speaking',
    WRITING: 'writing'
}

const TOASTS_TYPE = {
    ERROR: 'Error',
    SUCCESS: 'Success',
    WARNING: 'Warning',
    INFO: 'Info'
}

module.exports = {
    COLLECTIONS,
    PERMISSIONS,
    QUESTIONS_TYPE,
    TOASTS_TYPE
}
