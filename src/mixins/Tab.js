export default {
    props: {
        hash: String,
        isActive: Boolean
    },
    watch: {
        isActive(active) {
            if (active) {
                this.activeMethod()
            }
        }
    }
}
