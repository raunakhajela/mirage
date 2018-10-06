<template>
	<section>
		<br><br><br>
		<div v-if="doc==null || doc==undefined && showLoad">
			<p>Fetching</p>
			<div class="progress">
				<div class="indeterminate"></div>
			</div>
		</div>
		<div v-else-if="!showLoad && error">
			<p>We tried but we didnt get any data.</p>
			<p>Try checking your network connection otherwise append URL with "?timeout=[number of seconds]"</p>
		</div>
		<div v-else-if="doc=='undefined' && !showLoad">
			<div class="row">
				<div class="col s12">
					<div class="card blue lighten-3">
						<div class="card-content blue-text text-darken-4 z-depth-2">
							<span class="card-title" style="font-weight:bolder">Not Found</span>
							<br>
							<br>
							<p>
								Task with "{{id}}" not found
							</p>
							<br><br>
							<p>
								<router-link :to="{name:'tasks'}" class="waves-effect waves-light"><button class="btn black white-text " @click="this.$router.push({name:'tasks'})">Go Back</button></router-link>

							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<div class="row">
				<div class="col s9" style="font-size:23px; font-weight:bolder">
					{{doc.title}}
				</div>
				<div class="col s3 caret">
					<div class="right-align">
						<router-link :to="'/task/' + id + '/edit'" title="Edit"><i class="material-icons">create</i></router-link>
						&nbsp;&nbsp;&nbsp;
						<router-link :to="'/task/' + id + '/delete'" title="Delete"><i class="material-icons">delete</i></router-link>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col s12">
					<p>{{doc.description}}</p>

				</div>
			</div>
			<div class="row">
				<div class="col s3">
					<strong>Progress</strong>
				</div>
				<div class="col s9">
					<b>{{getCompleted.length}}</b> tasks out of <b>{{doc.tasks.length}}</b> tasks have been completed
					<br>{ {{getProgress}}% Completed }
				</div>
			</div>
			<div class="row">
				<div class="col s3">
					<strong>Today</strong>
				</div>
				<div class="col s9">
					{{String(today)}}
				</div>
			</div>
			<div class="row">
				<div class="col s3">
					<strong>Started On</strong>
				</div>
				<div class="col s9">
					{{String(getStartDateTime)}}
				</div>
			</div>

			<div class="row">
				<div class="col s3">
					<strong>To Be Ended By</strong>
				</div>
				<div class="col s9">
					{{String(getEndDateTime)}}
				</div>
			</div>
			<div class="row">
				<div class="col s3">
					<strong>Status</strong>
				</div>
				<div class="col s9">
					<span v-html="getLeftTime"></span>
				</div>
			</div>
			<div class="row">
				<div class="col s7 offset-s3">
					<button style="width:100%" class="btn blue darken-3" v-show="!showing" @click="showing=!showing">Show Tasks</button>
					<button style="width:100%" class="btn blue darken-3" v-show="showing" @click="showing=!showing">&nbsp;Hide Tasks&nbsp;</button>
				</div>
			</div>
			<div class="row" v-show="showing">
				<div class="col s12">
					<table class="z-depth-2">
						<thead class="blue white-text">
							<tr>
								<th class="center-align">#</th>
								<th class="center-align">Task</th>
								<th class="center-align">Status</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(value, key) in doc.tasks" :key="key" class="hoverable">
								<td class="center-align">
									{{key+1}}
								</td>
								<td class="center-align">
									{{value.name}}
								</td>
								<td v-if="value.done" class="center-align">
									<form action="#">
										<label>
											<input type="checkbox" checked="checked" @click="doc.tasks[key].done=!doc.tasks[key].done;update()">
											<span></span>
										</label>
									</form>
								</td>
								<td v-if="!value.done" class="center-align">
									<form action="#">
										<label>
											<input type="checkbox" @click="doc.tasks[key].done=!doc.tasks[key].done;update()" />
											<span></span>
										</label>
									</form>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import db from "../firebase.js";
import moment from "moment";
export default {
  data() {
    return {
      showLoad: true,
      error: false,
      id: this.$route.params.id,
      doc: {
        title: "",
        tasks: [],
        description: "",
        due_date: new Date(),
        start_date: new Date()
      },
      showing: false,
      today: new Date(),
      timeout: "",
      data: []
    };
  },
  methods: {
    update() {
      db.collection("TODOS")
        .doc(this.id)
        .update("tasks", this.doc.tasks)
        .then()
        .catch();
    }
  },
  created() {
    console.clear();
    setInterval(() => {
      this.today = new Date();
    }, 1000);
    this.timeout = setTimeout(() => {
      this.showLoad = false;
      this.error = true;
    }, 4000);
    db.collection("TODOS")
      .doc(this.id)
      .get()
      .then(snapshot => {
        this.doc = snapshot.data();
        this.data = this.doc.tasks;
        clearTimeout(this.timeout);
        if (this.doc == undefined) this.doc = "undefined";
      })
      //eslint-disable-next-line
      .catch(err => {
        this.error = true;
        this.showLoad = false;
      });
  },
  computed: {
    getProgress() {
      return Math.round(
        (this.getCompleted.length / this.doc.tasks.length) * 100
      );
    },
    getCompleted() {
      console.clear();
      console.log(this.doc.tasks);

      return this.doc.tasks.filter(x => x.done);
    },
    getLeftTime() {
      let end = this.getEndDateTime;
      let left = `${moment(end).fromNow()}`;
      if (/ago$/.test(left)) {
        return `<span style='color:red'>This TODO was expired <i>${left}</i></span>`;
      } else if (this.getProgress == 100) {
        return "<span style='color:green'>Completed</span>";
      } else if (this.getProgress == 0) {
        return `<span style='color:red'>Not Started. <i>To be completed with ${left}</i></span>`;
      } else {
        return `<span style='color:blue'>In Progress. <i>To be completed with ${left}</i></span>`;
      }
    },
    getStartDateTime() {
      let d = new Date(this.doc.start_date.seconds * 1000);
      return d;
    },
    getEndDateTime() {
      let d = new Date(this.doc.due_date.seconds * 1000);
      return d;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
