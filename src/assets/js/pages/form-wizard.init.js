import $ from 'jquery';
import '../../libs/smartwizard/jquery.smartWizard.min';
$(document).ready(function(){
  $("#smartwizard-arrows").smartWizard({theme:"arrows",useURLhash:!1,showStepURLhash:!1});
});
