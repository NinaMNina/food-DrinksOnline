package bean;

import java.io.Serializable;

import bean.enums.TipVozila;

public class Vozilo implements Serializable{
	private int id;
	private String marka;
	private String model;
	private TipVozila tip;
	private String registracionaOznaka;
	private String godiste;
	private boolean uUpotrebi;
	private String napomena;
	private int dostavljac;
	private boolean activ;
	
	
	public boolean isActiv() {
		return activ;
	}
	public void setActiv(boolean activ) {
		this.activ = activ;
	}
	

	public int getId() {
		return id;
	}
	public String getMarka() {
		return marka;
	}
	public String getModel() {
		return model;
	}
	public TipVozila getTip() {
		return tip;
	}
	public String getRegistracionaOznaka() {
		return registracionaOznaka;
	}
	public String getGodiste() {
		return godiste;
	}
	public boolean isuUpotrebi() {
		return uUpotrebi;
	}
	public String getNapomena() {
		return napomena;
	}
	public int getDostavljac() {
		return dostavljac;
	}

	public void setId(int id) {
		this.id = id;;
	}
	public void setMarka(String marka) {
		this.marka = marka;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public void setTip(TipVozila tip) {
		this.tip = tip;
	}
	public void setRegistracionaOznaka(String registracionaOznaka) {
		this.registracionaOznaka = registracionaOznaka;
	}
	public void setGodiste(String godiste) {
		this.godiste = godiste;
	}
	public void setuUpotrebi(boolean uUpotrebi) {
		this.uUpotrebi = uUpotrebi;
	}
	public void setNapomena(String napomena) {
		this.napomena = napomena;
	}
	public void setDostavljac(int dostavljac) {
		this.dostavljac = dostavljac;
	}
	public Vozilo() {
	}
	
	
	
	
}
