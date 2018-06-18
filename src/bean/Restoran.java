package bean;

import java.io.Serializable;
import java.util.ArrayList;

import bean.enums.Kategorija;

public class Restoran implements Serializable{
	private int id;
	private String naziv;
	private String adresa;
	private Kategorija kategorija;
	private boolean activ;
	
	private ArrayList<Pice> pica;
	private ArrayList<Jelo> jela;
	public String getNaziv() {
		return naziv;
	}
	
	public int getId() {
		return id;
	}
	public String getAdresa() {
		return adresa;
	}
	public Kategorija getKategorija() {
		return kategorija;
	}
	public ArrayList<Pice> getPica() {
		return pica;
	}
	public ArrayList<Jelo> getJela() {
		return jela;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}
	public void setKategorija(Kategorija kategorija) {
		this.kategorija = kategorija;
	}
	public void setPica(ArrayList<Pice> pica) {
		this.pica = pica;
	}
	public void setJela(ArrayList<Jelo> jela) {
		this.jela = jela;
	}	
	public boolean isActiv() {
		return activ;
	}

	public void setActiv(boolean activ) {
		this.activ = activ;
	}

	public Restoran() {
	}
	
	
	
}
