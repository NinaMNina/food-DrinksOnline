package jsonData;

import java.io.Serializable;
import java.util.ArrayList;

import bean.Korisnik;
import bean.Restoran;
import bean.Vozilo;

public class Data implements Serializable{
	private ArrayList<Korisnik> korisnici;
	private ArrayList<Restoran> restorani;
	private ArrayList<Vozilo> vozila;
	private static Data data=null;
	
	public static Data getInstance(){
		if(data==null){
			data = JsonSerializer.loadData();
		}
		return data;
	}
	
	public ArrayList<Korisnik> getKorisnici() {
		return korisnici;
	}


	public ArrayList<Restoran> getRestorani() {
		return restorani;
	}


	public ArrayList<Vozilo> getVozila() {
		return vozila;
	}


	public void setKorisnici(ArrayList<Korisnik> korisnici) {
		this.korisnici = korisnici;
	}


	public void setRestorani(ArrayList<Restoran> restorani) {
		this.restorani = restorani;
	}


	public void setVozila(ArrayList<Vozilo> vozila) {
		this.vozila = vozila;
	}


	public Data() {

	}
	
	
	
	
}
