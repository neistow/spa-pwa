const FilmList = Vue.component('button-counter', {
    data() {
        return {
            films: JSON.parse(localStorage.getItem('films')) || []
        }
    },
    methods: {
        saveFilms(films) {
            localStorage.setItem('films', JSON.stringify(films));
        },
        onDelete(id) {
            const filteredFilms = this.films.filter(f => f.id != id);
            this.saveFilms(filteredFilms);
            this.films = filteredFilms;
        }
    },
    template: `<table class="table" style="width: 100%">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="film in films" :key="film.id">
                        <td>{{ film.id }}</td>
                        <td>{{ film.name }}</td>
                        <td>{{ film.year }}</td>
                        <td>{{ film.rating }}</td>
                        <td @click="onDelete(film.id)">
                            <span class="button delete is-danger">Delete</span>
                        </td>
                    </tr>
                </tbody>
               </table>`
});

const FilmForm = {
    data() {
        return {
            film: {}
        }
    },
    methods: {
        onSubmit(){
            const films = JSON.parse(localStorage.getItem('films')) || [];
            films.push(this.film);
            localStorage.setItem('films', JSON.stringify(films));
            this.$router.push('/');
        }
    },
    template: `<form>
                    <div class="field">
                        <label class="label">Id</label>
                        <div class="control">
                            <input class="input" v-model.number="film.id" type="number">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" v-model="film.name" type="text">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Year</label>
                        <div class="control">
                            <input class="input" v-model.number="film.year" type="number">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Rating</label>
                        <div class="control">
                            <input class="input" v-model.numberl="film.rating" type="number">
                        </div>
                    </div>
                      <div class="control">
                        <button class="button is-link" @click.prevent="onSubmit()">Submit</button>
                      </div>
               </form>`
};

const routes = [
    { path: '/', component: FilmList },
    { path: '/add', component: FilmForm },
];

const router = new VueRouter({
    routes
});

const app = new Vue({ router }).$mount('#app');
