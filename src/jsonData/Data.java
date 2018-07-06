package jsonData;

import java.io.Serializable;
import java.util.ArrayList;

import bean.Jelo;
import bean.Korisnik;
import bean.Pice;
import bean.Porudzbina;
import bean.Restoran;
import bean.Vozilo;
import bean.enums.StatusPorudzbine;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	@JsonIgnore
	public int getJelaLength() {
		return getFinalLength();
	}
	@JsonIgnore
	public int getPicaLength() {
		return getFinalLength();
	}
	@JsonIgnore
	public int getFinalLength() {
		int retVal=0;
		for(Restoran r0 : restorani){
			retVal+=r0.getPica().size();
			retVal+=r0.getJela().size();
		}
		return retVal;
	}
	

	@JsonIgnore
	public void addJelo(Jelo j) {
		for(Restoran r0 : restorani){
			if(r0.getId()==j.getIdRestorana()){
				r0.getJela().add(j);
			}
		}
	}

	@JsonIgnore
	public void addPice(Pice j) {
		for(Restoran r0 : restorani){
			if(r0.getId()==j.getIdRestorana()){
				r0.getPica().add(j);
			}
		}
	}
	@JsonIgnore
	public int getPorudzbinaLength() {
		int retVal=0;
		for(Korisnik k0 : korisnici){
			retVal+=k0.getPorudzbine().size();
		}
		return retVal;
	}

	@JsonIgnore
	public Porudzbina getObavljamPorudzbinu(String un) {
		Porudzbina ret = null;
		for(Korisnik k : korisnici){
			for(Porudzbina p0 : k.getPorudzbine()){
				if(p0.getDostavljac().equals(un) && p0.getStatus().equals(StatusPorudzbine.UTOKU));
					return p0;
			}
		}
		return ret;
	}
	
	
}
