package DTO;

import java.sql.Date;

import bean.enums.StatusPorudzbine;

public class ArtikalDTO {
	private String rNaziv;
	private String rAdresa;
	private String naziv;
	private String opis;
	private int cena;
	private String mera;
	private int kolicina;
	
	public ArtikalDTO(){
		
	}

	public String getrNaziv() {
		return rNaziv;
	}

	public String getrAdresa() {
		return rAdresa;
	}

	public String getNaziv() {
		return naziv;
	}

	public String getOpis() {
		return opis;
	}

	public int getCena() {
		return cena;
	}

	public String getMera() {
		return mera;
	}

	public int getKolicina() {
		return kolicina;
	}

	public void setrNaziv(String rNaziv) {
		this.rNaziv = rNaziv;
	}

	public void setrAdresa(String rAdresa) {
		this.rAdresa = rAdresa;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public void setCena(int cena) {
		this.cena = cena;
	}

	public void setMera(String mera) {
		this.mera = mera;
	}

	public void setKolicina(int kolicina) {
		this.kolicina = kolicina;
	}
	
}
