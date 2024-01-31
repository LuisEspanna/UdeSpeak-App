export default function config() {
    // release -> Production
    // debug -> Develop
    const DEBUG = 'debug';
    const RELEASE = 'release'
    
    const appConfig = RELEASE;

    return {
        appConfig,
        RELEASE,
        DEBUG
    }
}