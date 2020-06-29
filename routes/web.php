<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|	
*/
Route::get('/test_odoo', 'OdooController@test_odoo');

Route::get('/logout', 'MainController@logout');

Route::get('/testProfile', 'MainController@testProfile');

Route::get('/login', 'AuthController@index');
Route::get('/register', 'AuthController@register');
Route::post('/post_register', 'AuthController@post_register');
Route::post('/post_login', 'AuthController@post_login');

Route::post('/reset_password', 'AuthController@reset_password');
Route::get('/email_verification', 'AuthController@email_verification');

Route::post('/send_email_forgot', 'AuthController@send_email_forgot');
Route::get('/form_forgot_password', 'AuthController@form_forgot_password');
Route::get('/form_reset_password/{tokens}', 'AuthController@form_reset_password');

Route::get('/link_verification_email/{token}', 'AuthController@link_verification_email');

Route::get('/resend_email_verification', 'AuthController@resend_email_verification');
Route::post('/resend_email', 'AuthController@resend_email');


Route::get('/', 'MainController@index');
Route::get('/job_detail/{job_name}/{id}', 'MainController@job_detail');
Route::get('/applicant/{id}/{id2}', 'MainController@applicant');
Route::get('/test_odoo_data', 'MainController@test_odoo_data');

Route::get('/about_us', 'MainController@about_us');

/* menu */
Route::get('/jobs/{page}/{offset}', 'MainController@jobs');
Route::get('/status_applicant/{company_name}', 'MainController@status_applicant');
Route::post('/post_applicant', 'MainController@post_applicant');
Route::post('/edit_profile', 'MainController@edit_profile');
Route::post('/search_job', 'MainController@search_job');
Route::get('/jobs_search/{search}/{city}/{department}/{page}/{offset}', 'MainController@on_search_jobs');


/*Profile*/
Route::get('/profile', 'ProfileController@profile');
Route::get('/profile/detail', 'ProfileController@index');
Route::get('/profile/education', 'ProfileController@profile_education');
Route::get('/profile/job_experience', 'ProfileController@profile_jobexperience');
Route::get('/profile/training', 'ProfileController@profile_training');
Route::get('/profile/skill', 'ProfileController@profile_skill');
Route::get('/profile/language', 'ProfileController@profile_language');
Route::get('/profile/training', 'ProfileController@profile_training');
Route::get('/profile/skill', 'ProfileController@profile_skill');
Route::get('/profile/language', 'ProfileController@profile_language');


Route::post('/post_profile/detail', 'ProfileController@edit_profile_detail');
Route::post('/post_profile/education', 'ProfileController@edit_profile_education');
Route::post('/post_profile/job_experience', 'ProfileController@edit_profile_jobexperience');
Route::post('/post_profile/skill', 'ProfileController@edit_profile_skill');
Route::post('/post_profile/training', 'ProfileController@edit_profile_training');
Route::post('/post_profile/language', 'ProfileController@edit_profile_language');


Route::get('/delete_profile/education/{id}', 'ProfileController@delete_profile_education');
Route::get('/delete_profile/job_experience/{id}', 'ProfileController@delete_profile_jobexperience');
Route::get('/delete_profile/skill/{id}', 'ProfileController@delete_profile_skill');
Route::get('/delete_profile/training/{id}', 'ProfileController@delete_profile_training');
Route::get('/delete_profile/language/{id}', 'ProfileController@delete_profile_language');

/*=============================*/

Route::get('/profile/job_applied', 'ProfileController@job_applied');
Route::get('/profile/withdraw', 'ProfileController@job_withdraw');
Route::get('/profile/accepted', 'ProfileController@job_accepted');
Route::get('/detail_job_applied/{id}', 'ProfileController@detail_job_applied');
Route::get('/profile/offering', 'ProfileController@job_offering');
Route::get('/profile/offering_detail/{id}', 'ProfileController@offering_detail');

Route::get('/profile/schedule_interview', 'ProfileController@schedule_interview');


Route::get('/refuse_schedule/{id}', 'ProfileController@refuse_schedule');
Route::get('/accept_schedule/{id}', 'ProfileController@accept_schedule');
Route::post('/re_schedule', 'ProfileController@re_schedule');


Route::get('/refuse_offer/{id}', 'ProfileController@refuse_offer');
Route::get('/accept_offer/{id}', 'ProfileController@accept_offer');

Route::get('/update_having_skill/{id}', 'ProfileController@updateHavingSkill');
Route::get('/update_having_jobexperience/{id}', 'ProfileController@updateHavingJobExperience');



Route::post('/profile/AppliedToWithdraw', 'ProfileController@AppliedToWithdraw');
