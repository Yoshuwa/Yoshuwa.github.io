// Router
var AppRouter = Backbone.Router.extend({
    routes: {
        'my-companies': 'showCompaniesPage',
        'my-activities': 'showActivitiesPage',
        "activities/:projectTitle/:companyName/:projectManager/:date": "showActivitiesPage",
        'my-leads': 'showLeadsPage',
        '*default': 'defaultRoute'
    },

    showCompaniesPage: function () {
        $('#content').html('<div class="col-md-12"> <!-- <h2>Line Chart</h2> --> <div id="lineChartContainer" style="min-width: 310px; height: 400px; margin: 0 auto"></div> </div> <div class="container-fluid mt-5"> <div class="row"> <div class="col-md-12"> <button type="button" class="btn btn-primary mb-3" id="createRecord">Criar Novo Projeto</button> <table id="projectTable" class="table table-striped table-bordered" style="width:100%"> <thead> <tr> <th>título do projeto</th> <th>nome da empresa</th> <th>gestor de projeto</th> <th>Date</th> <th>Action</th> </tr> </thead> <tbody> </tbody> </table> </div> </div> </div>');
        $.getScript('projects.js', function () {
            //fetchActivities()
        });
    },

    showActivitiesPage: function () {
        $('#content').html('<div class="row" id="tableRow"></div>');
        $.getScript('activities.js', function () {
            createTable()
            //$('.sub-table').DataTable();
        });
    }
,    
    

    showLeadsPage: function () {
        $('#content').html('<h2>My Leads Page</h2>');
    },

    defaultRoute: function () {
        this.navigate('my-companies', {trigger: true, replace: true});
    }
});

var appRouter = new AppRouter();

// Start Backbone history
Backbone.history.start();
