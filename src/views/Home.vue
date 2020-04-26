<template>
    <div>
        <h1>Home Page</h1>
        <span>{{CV.cv_state}}</span>
        <span>{{COUNT.num}}</span>
        <button @click="handleAction">点击</button>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                
            }
        },
        mounted() {
            setTimeout(() => {
                this.$store.commit('updateCV', '更改后的数据');
            }, 5000)
        },
        computed: {
            CV() {
                return this.$store.state.CV;
            },
            COUNT() {
                return this.$store.state.COUNT
            }
        },
        methods: {
            handleAction() {
                this.$store.dispatch('queryCount', 2)
                    .then(res => {
                        console.log(res);
                    })
            }
        }
    }
</script>