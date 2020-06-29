<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
// use Lzq\Mqtt\SamMessage;
// use Lzq\Mqtt\SamConnection;
use Illuminate\Support\Facades\Input;

// import session class using alias
use Session;
use DB;
use Mail;
use Hash;

class AuthController extends OdooBaseController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

        $this->middleware(function ($request, $next){

            if(session()->has('username')){
                return Redirect::to('/');
            }

            return $next($request); //<-- this line :)

        });

    }
    public function register()
    {
        $on_page = "Register";
        return view('register',compact('on_page'));
    }
    function sendEmailVerification($data) {
      $email = $data['email'];
      try{
        Mail::send(["html" => 'email.verification'], $data, function ($msg) use ($email){
          $msg->to($email, 'Welcome')->subject("Verifikasi Email");
          $msg->from('recruitment@kharismaindo.com', 'KHARISMAINDO');
        });
        /*return back()->with('alert-success','Berhasil Kirim Email');*/
      }catch (Exception $e){
        return response(['status' => false,'errors' => $e->getMessage()]);
      }
    }
    public function sendEmailForgotPassword($data)
    {
        try{
                Mail::send('email.forgot_password', $data, function ($message) use ($data)
                {
                    $message->subject("Forgot Password");
                    $message->from('recruitment@kharismaindo.com', 'KHARISMA POTENSIA INDONESIA');
                    $message->to($data['email']);
                });
            /*return back()->with('alert-success','Berhasil Kirim Email');*/
        }
        catch (Exception $e){
            return response (['status' => false,'errors' => $e->getMessage()]);
        }
    }
    public function reset_password(Request $req)
    {
        $this->setConnectOdoo();

        $data['pwd'] = Hash::make($req->password);
        $data['tokens'] = $req->_token.encrypt($req->password);
        $token = $req->token;

        $this->odoo->where('tokens', $token)
                        ->where('email_verification',1)
                        ->update('res.users',$data);

        session()->flash('message', "password berhasil diubah");
        session()->flash('alert', "success");
        return Redirect::to('/');

    }
    public function form_forgot_password(){

        $on_page = "Lupa Password";
        return view('form_forgot_password',compact('on_page'));
    }
    public function send_email_forgot(Request $req)
    {

        $this->setConnectOdoo();

        $data = $this->odoo->where('email', $req->email)
                         ->where('email_verification',1)
                         ->get('res.users');
        if(count($data) > 0){
            $data = $data[0];
            $this->sendEmailForgotPassword($data);
            session()->flash('message', "permintaan lupa password berhasil, silahkan cek email anda");
            session()->flash('alert', "success");
            return Redirect::to('/');

        }else{

            session()->flash('message', "email anda belum terdaftar");
            session()->flash('alert', "error");

            return Redirect::to('/');
        }
    }


    public function resend_email(Request $req)
    {

        $this->setConnectOdoo();

        $data = $this->odoo->where('email', $req->email)
                         ->where('email_verification',0)
                         ->get('res.users');
        if(count($data) > 0){

            $data = $data[0];
            $this->sendEmailVerification($data);
            session()->flash('register', "success");

            $on_page = "Resend Email Verifikasi";
            $email = $data['email'];
            return view('resend_verifikasi',compact('on_page','email'));

        }else{

            session()->flash('message', "email anda sudah aktif, silahkan login");
            session()->flash('alert', "success");

            return Redirect::to('/login');
        }
    }
    public function link_verification_email($token)
    {

        $this->setConnectOdoo();

        $data = $this->odoo->where('tokens', $token)
                            ->get('res.users');
                            // dd($data);
        if(count($data) > 0 ){
            if($data[0]['email_verification'] == 1){
                echo "Akun ini sudah aktif";
            }else{
                $this->odoo->where('tokens', $token)
                                ->where('email_verification',0)
                                ->update('res.users',['email_verification' => 1]);

                session()->flash('message', "activasi email berhasil dilakukan , harap lengkapi profile anda");
                session()->flash('alert', "success");

                return Redirect::to('/');
            }
        }else{
            echo "Error 404";
        }
    }
    public function form_reset_password($token)
    {

        $this->setConnectOdoo();

        $data = $this->odoo->where('tokens', $token)
                            ->where('email_verification',1)
                            ->get('res.users');
        if(count($data) > 0 ){
            $data = $data[0];
            $data['on_page'] = "Reset Password";
            return view('form_reset_password',$data);

        }else{
            echo "Error 404";
        }
    }
    public function post_login(Request $req)
    {

        $this->setConnectOdoo();

        $data = [];
        $data = $this->odoo->where('email', $req->email)
                         ->where('email_verification',1)
                         ->get('res.users');

        if(count($data) > 0){
            $data = $data[0];

            if(Hash::check($req->password,$data['pwd'])){

                session()->put('user_id', $data['id']); //simpan data
                session()->put('username', $data['login']); //simpan data
                session()->put('name', $data['name']); //simpan data
                $this->setSessionProfile();
                return Redirect::to('/');
            }
        }

        session()->flash('message', "Username atau password salah");
        session()->flash('alert', "error");
        return Redirect::to('/login');

    }
    public function post_register(Request $req)
    {

        $this->setConnectOdoo();
        $data_user = $this->odoo->where('email', $req->email)->get('res.users');
        $data_user_ktp = $this->odoo->where('identification_id', $req->identification_id)->get('res.users');

        $pos = strpos($req->email,"@");
        $username = substr($req->email,0,$pos);
        $data = [];

        $data['name'] = $req->name;
        $data['email'] = $req->email;
        $data['identification_id'] = $req->identification_id;

        $data['login'] = $username;
        $data['pwd'] = Hash::make($req->password);
        $data['tokens'] = $req->_token.encrypt($req->password);
        $data['active'] = 1;

        if(count($data_user) > 0){

            $data_user = $data_user[0];

            if($data_user['email_verification'] == 0){

                $id = $this->odoo->where('email',$req->email)->update('res.users',$data);
                $this->sendEmailVerification($data);
                session()->flash('register', "success");

                $on_page = "Resend Email Verifikasi";
                $email = $data['email'];
                return view('resend_verifikasi',compact('on_page','email'));

            }else{
                if(count($data_user_ktp) > 0){
                    session()->flash('message', "No KTP ini sudah terdaftar");
                    session()->flash('alert', "error");
                    return Redirect::to('/register');
                }
                session()->flash('message', "Email sudah terdaftar");
                session()->flash('alert', "error");
                return Redirect::to('/register');
            }

        } else{
            if(count($data_user_ktp) > 0){
                session()->flash('message', "No KTP ini sudah terdaftar");
                session()->flash('alert', "error");
                return Redirect::to('/register');
            }
            $id = $this->odoo->create('res.users',$data);


            $this->sendEmailVerification($data);

            session()->flash('register', "success");

            $on_page = "Resend Email Verifikasi";
            $email = $data['email'];
            return view('resend_verifikasi',compact('on_page','email'));


            //return Redirect::to('/login');

        }

    }
    public function ResendEmailVerification()
    {

        $this->setConnectOdoo();

        $data_user = $this->odoo->where('email', $req->email)->where('pwd', Hash::make($req->password))->get('res.users');
    }
    public function email_verification(Request $req)
    {
        return view('email.verification');
    }
    public function index()
    {
        $on_page = "Login";
        return view('login',compact('on_page'));
    }





}
