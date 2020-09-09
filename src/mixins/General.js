import { v4 as uuidv4 } from 'uuid'
export default {
    methods: {
        createModal(name, props) {
            let component = {
                component: name,
                props,
                guid: uuidv4()
            }

            this.$store.commit('ADD_MODAL', component)
        }
    }
}
