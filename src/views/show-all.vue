<template>
	<section>
		<h5 style="text-align:center">Your All Tasks</h5>
		<br><br>
		<table class="striped highlight">
			<thead class="blue darken-2 white-text">
				<tr>
					<th class="center-align" style="padding-left:10px;padding-right:10px">#</th>
					<th class="center-align">Title</th>
					<th class="center-align">Description</th>
					<th class="center-align">Due Date<br><small>(Format : <i>DD/MM/YYYY</i> )</small></th>
					<th class="center-align">Action</th>
				</tr>
			</thead>
			<tbody v-if="tasks.length==0">
				<tr v-show="loading">
					<td colspan="5" class="center-align">
						<div class="preloader-wrapper big active">
							<div class="spinner-layer spinner-blue-only">
								<div class="circle-clipper left">
									<div class="circle"></div>
								</div>
								<div class="gap-patch">
									<div class="circle"></div>
								</div>
								<div class="circle-clipper right">
									<div class="circle"></div>
								</div>
							</div>
						</div>
					</td>
				</tr>
				<tr v-show="!loading">
					<td colspan="5">
						<div class="center-align">
							No record was found
						</div>
					</td>
				</tr>
			</tbody>
			<tbody v-else>
				<template v-for="(task, index) in tasks" class="light-blue lighten-4">
					<tr :key="index">
						<td class="center-align" style="padding-left:10px;padding-right:10px">
							{{index+1}}
						</td>
						<td>
							{{task.data.title}}
						</td>
						<td>
							{{task.data.description}}

						</td>
						<td class="center-align">

							{{getDate(task.data.due_date)}}
						</td>
						<td class="center-align">
							<router-link :to="'/task/' + task.id">View</router-link>
						</td>
					</tr>
				</template>
			</tbody>

		</table>
	</section>
</template>

<script>
import db from "../firebase.js";
var timeout;
export default {
  data() {
    return {
      tasks: [],
      timeout: 6000,
      loading: true
    };
  },
  methods: {
    getDate(date) {
      let d = new Date(date.seconds * 1000);
      return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    },
    v() {
      this.toi = setTimeout(() => {
        this.showLoad = false;
      }, this.timeout);
    }
  },
  created() {
    console.clear();
    if (
      Object.keys(this.$route.query).length == 1 &&
      this.$route.query.timeout !== ""
    ) {
      this.timeout = parseInt(this.$route.query.timeout);
    }
    timeout = setTimeout(() => {
      console.log("done");
    }, this.timeout);
    db.collection("TODOS")
      .get()
      .then(snapshot => {
        clearTimeout(timeout);
        this.loading = false;
        snapshot.forEach(doc => {
          this.tasks.push({ data: doc.data(), id: doc.id });
        });
      })
      // eslint-disable-next-line
      .catch(err => {
        this.tasks = "";
        this.showLoad = false;
        this.error = true;
      });
  }
};
</script>

<style scoped>
* {
  font-family: "Aldrich", Courier, monospace;
}
</style>
