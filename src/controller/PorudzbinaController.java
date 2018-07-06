package controller;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import jsonData.Data;
import jsonData.JsonSerializer;
import bean.Korisnik;
import bean.Porudzbina;
import bean.enums.StatusPorudzbine;

@Path("/porudzbina")
public class PorudzbinaController {
	@POST
	@Path("/dodaj")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response dodajPorudzbina(Porudzbina p) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i kreiram Porudzbinu");
		Korisnik k = null;
		List<Korisnik> r = Data.getInstance().getKorisnici();
		for(Korisnik k0 : r){
			if(k0.getUsername().equals(p.getKorisnik()))
				k=k0;				
		}
		p.setId(Data.getInstance().getPorudzbinaLength());
		k.getPorudzbine().add(p);
		JsonSerializer.saveData();
		return Response.ok(p, MediaType.APPLICATION_JSON).build();
	}
	@GET
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response mojePorudzbine(@PathParam("username") String username) {
		ArrayList<Porudzbina> p = new ArrayList<>();
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			if(k0.getUsername().equals(username)){
				return Response.ok(k0.getPorudzbine(), MediaType.APPLICATION_JSON).build();
				
			}
		}
		return Response.status(Status.BAD_REQUEST).build();
	}
	@GET
	@Path("/sve")
	@Produces(MediaType.APPLICATION_JSON)
	public Response svePorudzbine() {
		ArrayList<Porudzbina> p = new ArrayList<>();
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			for(Porudzbina p0 : k0.getPorudzbine())
				p.add(p0);
		}
		return Response.ok(p, MediaType.APPLICATION_JSON).build();
	}
	@GET
	@Path("/moje/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response mojeDostave(@PathParam("username") String username) {
		ArrayList<Porudzbina> p = new ArrayList<>();
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			for(Porudzbina p0 : k0.getPorudzbine()){
				if(p0.getDostavljac().equals(username)){
					p.add(p0);
				}
			}
		}
		return Response.ok(p, MediaType.APPLICATION_JSON).build();			
	}
	@GET
	@Path("/zaDostavu")
	@Produces(MediaType.APPLICATION_JSON)
	public Response porudzbineZaDostavu() {
		ArrayList<Porudzbina> p = new ArrayList<>();
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			for(Porudzbina p0 : k0.getPorudzbine()){
				if(p0.getStatus().equals(StatusPorudzbine.PORUCENO))
					p.add(p0);
			}
		}
		return Response.ok(p, MediaType.APPLICATION_JSON).build();
	}
	@DELETE
	@Path("/brisi/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response izvrisiPorudzbina(@PathParam("id") int id) {	
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			for(int i=0; i<k0.getPorudzbine().size(); i++){
				if(k0.getPorudzbine().get(i).getId()==id){
					k0.getPorudzbine().get(i).setActiv(false);;
					JsonSerializer.saveData();
					return Response.ok(k0.getPorudzbine().get(i), MediaType.APPLICATION_JSON).build();			
				}
			}
		}
		return Response.status(Status.BAD_REQUEST).build();
	}
	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response changedPorudzbina(@PathParam("id") int id, Porudzbina p) {	
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			for(int i=0; i<k0.getPorudzbine().size(); i++){
				if(k0.getPorudzbine().get(i).getId()==id){
					k0.getPorudzbine().set(i, p);
					JsonSerializer.saveData();
					return Response.ok(p, MediaType.APPLICATION_JSON).build();			
				}
			}
		}
		return Response.status(Status.BAD_REQUEST).build();
	}
	@PUT
	@Path("/done/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response changeRegStatus(@PathParam("id") int id) {	
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			for(Porudzbina p0 : k0.getPorudzbine()){
				if(p0.getId()==id){
					p0.setStatus(StatusPorudzbine.DOSTAVLJENO);
					JsonSerializer.saveData();
					return Response.ok(p0, MediaType.APPLICATION_JSON).build();			
				}
						
			}
		}
		return Response.status(Status.BAD_REQUEST).build();
	}
	@PUT
	@Path("/take/{id}/by/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response changeRegStatus(@PathParam("id") int id, @PathParam("username") String username) {	
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			for(Porudzbina p0 : k0.getPorudzbine()){
				if(p0.getId()==id){
					p0.setStatus(StatusPorudzbine.UTOKU);
					p0.setDostavljac(username);
					for(Korisnik k1 : korisnici){
						if(k1.getUsername().equals(username)){
							k1.getDostavlja().add(id);
							JsonSerializer.saveData();
							return Response.ok(p0, MediaType.APPLICATION_JSON).build();
						}
					}			
				}						
			}
		}
		return Response.status(Status.BAD_REQUEST).build();
	}
}
