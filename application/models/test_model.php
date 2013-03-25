<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	
	class Test_model extends CI_Model{
		
		public function getAllData($nama, $awal, $akhir){

			$this->db->like('username', $nama, 'both');
			$this->db->from('m_user');
			$count =  $this->db->count_all_results();	
			$length = ($akhir+1) - $awal; 
			// echo $length;

			$this->db->select('*')->from('m_user')->like('username', $nama, 'both')->limit($length, $awal);
			$query = $this->db->get();

			// if($query->num_rows() > 0){
				$data = $query->result();
				return json_encode($data);
			// } else {
				// return json_encode($data);
			// }
		}		
		public function getAllHeader($nama = ""){
			$this->db->select('*')->from('m_user')->like('username', $nama, 'both');
			$data = $this->db->get()->result();

			return $data;

		}
		public function getPemasukan($id_user = 0){
			// $data = $this->db->query("SELECT * FROM m_gaji where id_user = $id_user")->result();
			// $data = $this->db->get_where('m_gaji', array('id_user' => ,'1'));
			$this->db->select('*')->from('m_gaji')->where('id_user', $id_user);
			$data = $this->db->get()->result();

			// $data = $query->result();
			// echo json_encode($data);
			return $data;
		}

		public function simpanAll($data){
			$this->db->insert_batch('m_user', $data); 
		}	

		public function delete($id){
			$this->db->where('id', $id);
			$this->db->delete('m_user');
		}	

		public function update($data, $id){
			$this->db->where('id', $id);
			$this->db->update('m_user', $data);
		}	
	}
?>