<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	class Test_controller extends CI_Controller{
		
		public function __construct(){
			parent::__construct();
			$this->load->helper(array('form', 'url'));
			$this->load->model('test_model');
		}

		public function index(){
			$this->load->view('test_view');
		}

		public function testControllerMenu1(){
			$method = $_SERVER['REQUEST_METHOD'];
			// echo json_encode($_SERVER);
			if($method == "GET"){
				$nama = $this->input->get('nama');

				$limit = $_SERVER['HTTP_RANGE'];
				$cut = substr($limit, 6, 9);
				$split = explode("-",$cut);
				$splitAtas  = $split[0];
				$splitBawah = $split[1];

				$this->db->like('username', $nama, 'both');
				$this->db->from('m_user');
				$count =  $this->db->count_all_results();
				
				$data = $this->test_model->getAllData($nama, $splitAtas, $splitBawah);
				header("Content-Range:items ".$splitAtas."-".$splitBawah."/".$count."");
				header("Content-Type:application/json;charset=UTF-8");

				echo $data;

			} else if($method == "POST"){

				$data = json_decode(file_get_contents('php://input'), true);
				$this->test_model->simpanAll($data);
				// $this->test_controllergetPhotoUploaded('save');

			} else if($method == "DELETE"){
				$id = $this->uri->segment(3);
				// echo $id;
				$this->test_model->delete($id);
				
			} else if($method == "PUT"){
				$data = json_decode(file_get_contents('php://input'), true);
				$id = $this->uri->segment(3);

				$this->test_model->update($data, $id);
				// echo json_encode($data);
			}
			
		}

		public function getAllData2(){
			$dataArr = array(
				array(
				'username' => "feldy", 	
				'kode' => "002"
				),
				array(
				'username' => "yusuf", 	
				'kode' => "001"
				)
			);
			echo $_SERVER['REQUEST_METHOD']."<br />";

			echo json_encode($dataArr);
		}

		public function getPhotoUploaded($type){
			// $file_element_name = $this->input->post('testLightBoxUploader');
			$file_element_name = "testLightBoxUploader";
			$file_name_post = $_FILES['testLightBoxUploader']['name'];

			// $file_name = md5($file_name_post."-".date("H:i:s"));
			
			if($type == "save"){
				$config['upload_path'] = './application/views/app/upload/';
				// $config['file_name'] = $file_name;
			} else {
				$config['upload_path'] = './application/views/app/tmp/';
			}
			$config['allowed_types'] = 'gif|jpg|png|jpeg';
			// $config['file_name'] = $file_name;
			//$config['max_size']	= '1000000';
			// $config['max_width']  = '1024';
			// $config['max_height']  = '768';

	      	$this->load->library('upload' ,$config);
		
			if(!$this->upload->do_upload($file_element_name)){
				 echo json_encode($this->upload->display_errors());
				 $this->output->set_status_header('500');
			} else {
				echo json_encode($this->upload->data());
			}

			
		}

		public function deleteFileTmp(){
			unlink(realpath('application/views/app/upload/6b50db82b9e0dba254789ed0cc3601e0.jpg'));
		}

		public function testTreeJson(){
			$arrHeader = array();
			//get header


			//get child
			$data = $this->test_model->getAllHeader();
			// $data = $this->test_model->getPemasukan(1);
			foreach ($data as $key) {
				$pem = $this->test_model->getPemasukan($key->id);
				// echo json_encode($key);
				$key->children = $pem;
				$arrHeader[] = $key;
			}

			//header
			$arr = array('identifier' => 'username', 'label' => 'id', 'items' => $arrHeader);

			echo json_encode($arr);
		}

		public function testComboGrid(){
			$page 	= $this->input->get('page');// get the requested page
			$limit 	= $this->input->get('rows');// get how many rows we want to have into the grid
			$sidx 	= $this->input->get('sidx');// get index row - i.e. user click to sort
			$sord 	= $this->input->get('sord');// get the direction
			$searchTerm = $this->input->get('searchTerm');

			if(!$sidx) $sidx = 1;
			if ($searchTerm == "") {
				$searchTerm = "%";
			} else {
				$searchTerm = "%" . $searchTerm . "%";
			}

			$result = mysql_query("SELECT COUNT(*) AS count FROM anggota WHERE nama like '$searchTerm' or kota like '$searchTerm'");
			$row = mysql_fetch_array($result,MYSQL_ASSOC);
			$count = $row['count'];

			if( $count >0 ) {
				$total_pages = ceil($count/$limit);
			} else {
				$total_pages = 0;
			}
			if ($page > $total_pages) $page=$total_pages;
			$start = $limit*$page - $limit; // do not put $limit*($page - 1)
			if($total_pages!=0) $SQL = "SELECT * FROM anggota WHERE nama like '$searchTerm' or kota like '$searchTerm'  ORDER BY $sidx $sord LIMIT $start , $limit";
			else $SQL = "SELECT * FROM anggota WHERE nama like '$searchTerm' or kota like '$searchTerm'  ORDER BY $sidx $sord";
			$result = mysql_query( $SQL ) or die("Couldn t execute query.".mysql_error());

			$response->page = $page;
			$response->total = $total_pages;
			$response->records = $count;
			$i=0;
			while($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
			/*
			    $response->rows[$i]['id']=$row[id];
			    $response->rows[$i]['cell']=array($row[id],$row[invdate],$row[name],$row[amount],$row[tax],$row[total],$row[note]);
			*/
			    $response->rows[$i]['no']=$row['no'];
			    $response->rows[$i]['nama']=$row['nama'];
			    $response->rows[$i]['kota']=$row['kota'];
			    //$response->rows[$i]=array($row[id],$row[invdate],$row[name],$row[amount],$row[tax],$row[total],$row[note]);
			    $i++;
			}        
			echo json_encode($response);
		}
	}	

?>