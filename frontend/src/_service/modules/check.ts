export default () => ({
    file: ( file: File ) => {
        if ( !file.size && !file.type ) { return false }
        return true
    }
})
