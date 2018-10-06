<template>
  <section>
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content black-text">
            <span class="card-title">Register New TODO</span>
            <form @submit.prevent="r()">
              <div class="row">
                <div class="col s12">
                  <div class="input-field">
                    <input id="title" type="text" autocomplete="off">
                    <label for="title">Title</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <textarea id="desc" class="materialize-textarea" v-model="a" autocomplete="off"></textarea>
                  <label for="desc">Description</label>
                  <p class="right-align">
                    {{len}}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input disabled :value="time" id="disabled-start" type="text" autocomplete="off">
                  <label for="disabled-start">Start Date/Time</label>
                </div>
              </div>
              <div class="row">
                <div class="col s6">
                  <div class="input-field">
                    <input id="due_date" type="text" class="datepicker" autocomplete="off">
                    <label for="due_date">Due Date</label>
                  </div>
                </div>
                <div class="col s6">
                  <div class="input-field">
                    <input id="due_time" type="text" class="timepicker" autocomplete="off">
                    <label for="due_time">Due Time</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <div class="chips chips-placeholder"></div>
                  <p class="grey-text">Press enter to lock each task
                  </p>
                </div>

              </div>
              <div class="row">
                <div class="input-field col s12">
                  <button type="submit" class="btn btn-block waves-effect waves-ripple light-blue">Add New</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import db from "../firebase.js";
export default {
  data() {
    return {
      a: "",
      time: String(new Date())
    };
  },
  methods: {
    makeDoc() {
      var chips = [];
      // eslint-disable-next-line
      M.Chips.getInstance($(".chips")).chipsData.forEach(_ =>
        chips.push({ name: _.tag, done: false })
      );
      // eslint-disable-next-line
      var due_date = $("#due_date").val();
      // eslint-disable-next-line
      var due_time = $("#due_time").val();
      if (due_time == "") {
        alert("Due Time is empty");
        return;
      } else {
        due_time = {
          h: due_time.split(":")[0],
          m: due_time.split(":")[1]
        };
      }
      if (due_date == "") {
        alert("Due Date is empty");
        return;
      } else {
        due_date = {
          year: due_date.split("-")[2],
          month: due_date.split("-")[1],
          day: due_date.split("-")[0]
        };
      }
      var edate = new Date(
        due_date.year,
        due_date.month,
        due_date.day,
        due_time.h,
        due_time.m,
        0
      );
      var doc = {
        // eslint-disable-next-line
        title: $("#title").val(),
        // eslint-disable-next-line
        description: $("#desc").val(),
        // eslint-disable-next-line
        start_date: new Date($("#disabled-start").val()),
        tasks: chips,
        due_date: edate
      };
      return doc;
    },
    r() {
      var doc = this.makeDoc();

      if (doc.tasks.length == 0) {
        alert("No Tasks Added");
        return;
      } else if (doc.title.length == 0) {
        alert("No Description Added");
        return;
      }
      db.collection("TODOS")
        .add(doc)
        .then(snapshot => {
          alert("TODO Has Been Added");
          this.$router.push({ name: "task", params: { id: snapshot.id } });
        })
        .catch(console.warn);
    }
  },

  created() {
    setInterval(() => {
      this.time = String(new Date());
    }, 1000);
    console.clear();
    // eslint-disable-next-line
    $(document).ready(function() {
      // eslint-disable-next-line
      M.updateTextFields();
      // eslint-disable-next-line
      $(".datepicker").datepicker({
        firstDay: 0,
        format: "dd-mm-yyyy"
      });
      // eslint-disable-next-line
      $(".timepicker").timepicker({
        twelveHour: false,
        vibrate: true
      });
      // eslint-disable-next-line
      $(".chips-placeholder").chips({
        placeholder: "Enter Tasks",
        secondaryPlaceholder: "+Task"
      });
    });
  },
  computed: {
    len() {
      return 256 - this.a.length;
    }
  }
};
</script>

<style scoped>
.btn-block {
  width: 100%;
}
* {
  font-family: "Aldrich", Courier, monospace;
}
</style>
