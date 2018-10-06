<template>
	<section>
		<nav class="blue lighten-2">
			<div class="nav-wrapper container">
				<a data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
				<router-link to="/" class=" brand-logo">Mirage</router-link>
				<ul id="nav-mobile" class="right hide-on-med-and-down">
					<li>
						<router-link to="/tasks" exact-active-class="blue darken-3">Tasks</router-link>
					<li>
						<router-link to="/new" exact-active-class="blue darken-3">Add New</router-link>
					</li>
					<li><a href="https://github.com/tbhaxor/mirage/issues/new?template=bug_report.md" target="_blank">Bug Report</a></li>
				</ul>
			</div>
		</nav>
		<ul class="sidenav" id="mobile-demo">
			<li>
				<router-link to="/tasks" exact-active-class="blue darken-3 white-text">Tasks</router-link>
			<li>
				<router-link to="/new" exact-active-class="blue darken-3 white-text">Add New</router-link>
			</li>
			<li><a href="https://github.com/tbhaxor/mirage/issues/new?template=bug_report.md" target="_blank">Bug Report</a></li>
		</ul>
		<div class="container">
			<router-view></router-view>
		</div>
		<!-- <footer class="page-footer">
			<div class="container">
				<div class="row">
					<div class="col l6 s12">
						<h5 class="white-text"><span class="doon">About</span></h5>
						<p class="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
					</div>
					<div class="col l4 offset-l2 s12">
						<h5 class="white-text">Links</h5>
						<ul>
							<li><a class="grey-text text-lighten-3" href="#!">Link 1</a></li>
							<li><a class="grey-text text-lighten-3" href="#!">Link 2</a></li>
							<li><a class="grey-text text-lighten-3" href="#!">Link 3</a></li>
							<li><a class="grey-text text-lighten-3" href="#!">Link 4</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="footer-copyright">
				<div class="container">
					© 2014 Copyright Text
					<a class="grey-text text-lighten-4 right" href="#!">More Links</a>
				</div>
			</div>
		</footer> -->

	</section>
</template>

<script>
export default {
  created() {
    // eslint-disable-next-line
    $(document).ready(() => {
      // eslint-disable-next-line
      $(".sidenav").sidenav();
      // eslint-disable-next-line
      $(".sidenav")
        .sidenav()
        .on("click tap", "li a", () => {
          // eslint-disable-next-line
          $(".sidenav").sidenav("close");
        });
    });
  }
};
</script>
<style scoped>
container {
  color: blue;
}
.brand-logo,
ul li a,
doon {
  font-family: "Audiowide", Courier, monospace;
}
</style>
