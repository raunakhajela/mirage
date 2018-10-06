<template>
  <section>
    <div class="row">
      <div class="input-field">
        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content black-text">
                <span class="card-title">Edit TODO <small>( Fetching )</small></span>
                <form @submit.prevent="r()">
                  <div class="row">
                    <div class="col s12">
                      <div class="input-field">
                        <input id="title" type="text" v-model="title" autocomplete="off">
                        <label for="title">Title</label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <textarea id="desc" autocomplete="off" class="materialize-textarea" v-model="desc" data-length="256" maxlength="256"></textarea>
                      <label for="textarea2">Description</label>
                      <p class="right-align">

                        {{len}}
                      </p>
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
                        <input id="due_time" type="text" autocomplete="off" class="timepicker">
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
                      <button type="submit" style="width:100%" class="btn btn-block waves-effect waves-ripple light-blue">Update</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
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
      id: this.$route.params.id,
      title: "",
      desc: ""
    };
  },
  computed: {
    len() {
      return 256 - this.desc.length;
    }
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
      db.collection("TODOS")
        .doc(this.id)
        .update(doc)
        .then(() => {
          alert("Updated");
          this.$router.push({ name: "task", params: { id: this.id } });
        })
        .catch(console.warn);
    }
  },
  created() {
    console.clear();
    db.collection("TODOS")
      .doc(this.id)
      .get()
      .then(snapshot => {
        var doc = snapshot.data();
        this.title = doc.title;
        this.desc = doc.description;
        // eslint-disable-next-line
        var chipInst = M.Chips.getInstance($(".chips"));
        doc.tasks.forEach(task => {
          chipInst.addChip({ tag: task.name });
        });
        const d = new Date(doc.due_date.seconds * 100);
        // eslint-disable-next-line
        $("#due_date").val(
          d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear()
        );
        // eslint-disable-next-line
        $("#due_time").val(d.getHours() + ":" + d.getMinutes());
        // eslint-disable-next-line
        $(".chips").focus();
        setTimeout(() => {
          // eslint-disable-next-line
          $("#due_time").focus();
        }, 100);
        setTimeout(() => {
          // eslint-disable-next-line
          $("#due_date").focus();
        }, 200);
        setTimeout(() => {
          // eslint-disable-next-line
          $("#desc").focus();
        }, 300);
        setTimeout(() => {
          // eslint-disable-next-line
          $("#title").focus();
          // eslint-disable-next-line
          $("small").html("( Ready )");
        }, 500);
        setTimeout(() => {
          // eslint-disable-next-line
          $("small").fadeOut("slow");
        }, 800);
        // // eslint-disable-next-line
        // $("#desc").focus();
        // setTimeout(() => {
        //   // eslint-disable-next-line
        //   $("#title").focus();
        // }, 1);
      });
    // eslint-disable-next-line

    // eslint-disable-next-line
    $(document).ready(function() {
      // eslint-disable-next-line
      $("input#input_text, textarea#textarea2").characterCounter();
      // eslint-disable-next-line
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
      // eslint-disable-next-line
      M.updateTextFields();
    });
  }
};
</script>

<style scoped>
</style>
