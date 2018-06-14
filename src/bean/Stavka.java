package bean;

import java.io.Serializable;

public class Stavka implements Serializable{
	private String naziv;
	private int idArtikla;
	private int kolicina;
	public String getNaziv() {
		return naziv;
	}
	public int getIdArtikla() {
		return idArtikla;
	}
	public int getKolicina() {
		return kolicina;
	}
	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}
	public void setIdArtikla(int idArtikla) {
		this.idArtikla = idArtikla;
	}
	public void setKolicina(int kolicina) {
		this.kolicina = kolicina;
	}
	public Stavka() {
	}
	
	
}
