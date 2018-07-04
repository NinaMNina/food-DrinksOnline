package jsonData;

import java.io.Serializable;
import java.util.ArrayList;

import bean.Jelo;
import bean.Korisnik;
import bean.Pice;
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

	public int getJelaLength() {
		int retVal=0;
		for(Restoran r0 : restorani){
			retVal+=r0.getJela().size();
		}
		return retVal;
	}
	public int getPicaLength() {
		int retVal=0;
		for(Restoran r0 : restorani){
			retVal+=r0.getPica().size();
		}
		return retVal;
	}

	public void addJelo(Jelo j) {
		for(Restoran r0 : restorani){
			if(r0.getId()==j.getIdRestorana()){
				r0.getJela().add(j);
			}
		}
	}

	public void addPice(Pice j) {
		for(Restoran r0 : restorani){
			if(r0.getId()==j.getIdRestorana()){
				r0.getPica().add(j);
			}
		}
	}
	
	
	
}
