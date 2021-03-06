package controller;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
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
import DTO.KorisnikDTO;
import bean.Korisnik;
import bean.Porudzbina;
import bean.enums.Uloga;

@Path("/korisnik")
public class KorisnikController {
	@GET
	@Path("/svi")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response sviKorisnici() {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i dobavnljam sve korisnike");
		List<Korisnik> r = Data.getInstance().getKorisnici();
		JsonSerializer.saveData();
		return Response.ok(r, MediaType.APPLICATION_JSON).build();
	}
	@GET
	@Path("/reg")
	@Produces(MediaType.APPLICATION_JSON)
	public Response regKorisnici() {	
		List<Korisnik> ret = new ArrayList<>();
		List<Korisnik> r = Data.getInstance().getKorisnici();
		for(Korisnik k0 : r){
			if(k0.getUloga().equals(Uloga.REG))
				ret.add(k0);
		}
		return Response.ok(ret, MediaType.APPLICATION_JSON).build();
	}
	@GET
	@Path("/dost")
	@Produces(MediaType.APPLICATION_JSON)
	public Response dostKorisnici() {	
		List<Korisnik> ret = new ArrayList<>();
		List<Korisnik> r = Data.getInstance().getKorisnici();
		for(Korisnik k0 : r){
			if(k0.getUloga().equals(Uloga.DOST))
				ret.add(k0);
		}
		return Response.ok(ret, MediaType.APPLICATION_JSON).build();
	}
	@GET
	@Path("/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getKorisnik(@PathParam("username") String username) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i dobavnljam sve korisnike");
		List<Korisnik> r = Data.getInstance().getKorisnici();
		for(Korisnik k0 : r){
			if(k0.getUsername().equals(username))
				return Response.ok(k0, MediaType.APPLICATION_JSON).build();
				
		}
		return Response.status(Status.BAD_REQUEST).build();
	}
	@GET
	@Path("/dostavlja/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getDostava(@PathParam("username") String username) {	
		List<Korisnik> r = Data.getInstance().getKorisnici();
		for(Korisnik k0 : r){
			if(k0.getUsername().equals(username)){
				Porudzbina p = Data.getInstance().getObavljamPorudzbinu(username);
				if(p!=null)
					return Response.ok(p, MediaType.APPLICATION_JSON).build();
				else{
					return Response.ok(null, MediaType.APPLICATION_JSON).build();
				}
			}				
		}
		return Response.status(Status.BAD_REQUEST).build();
	}
	@POST
	@Path("/kreiraj")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createUser(Korisnik k) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("tu sam i kreiram");
		if(checkIfUnique(k.getUsername())){
			Data.getInstance().getKorisnici().add(k);
			JsonSerializer.saveData();
			return Response.ok(k, MediaType.APPLICATION_JSON).build();
		}
		return Response.ok(null, MediaType.APPLICATION_JSON).build();
	}
	
	@POST
	@Path("/log")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response logInUser(KorisnikDTO k) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("logujem");
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			if(k0.getUsername().equals(k.getUsername()))
				if(k0.getPass().equals(k.getPass())){
					k.setUloga(k0.getUloga());
					return Response.ok(k, MediaType.APPLICATION_JSON).build();					
				}
		}
		return Response.ok(null, MediaType.APPLICATION_JSON).build();
	}
	@PUT
	@Path("/reg/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response changeRegStatus(@PathParam("username") String username) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("menjam status");
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			if(k0.getUsername().equals(username)){
				k0.setUloga(Uloga.REG);
				JsonSerializer.saveData();
				return Response.ok(k0, MediaType.APPLICATION_JSON).build();					
			}
		}
		return Response.ok(null, MediaType.APPLICATION_JSON).build();
	}
	@PUT
	@Path("/{username}/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response addOmiljno(@PathParam("username") String username, @PathParam("id") int id) {		
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			if(k0.getUsername().equals(username)){
				k0.getOmiljeno().add(id);
				JsonSerializer.saveData();
				return Response.ok(k0, MediaType.APPLICATION_JSON).build();					
			}
		}
		return Response.status(Status.BAD_REQUEST).build();
	}
	@PUT
	@Path("/dost/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response changeDostStatus(@PathParam("username") String username) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("menjam status");
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			if(k0.getUsername().equals(username)){
				k0.setUloga(Uloga.DOST);
				JsonSerializer.saveData();
				return Response.ok(k0, MediaType.APPLICATION_JSON).build();					
			}
		}
		return Response.ok(null, MediaType.APPLICATION_JSON).build();
	}
	@PUT
	@Path("/admin/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response changeAdminStatus(@PathParam("username") String username) {	
	//	k.setDatumRegistracije(new Date(k.getDatumRegistracije()));
		System.out.println("menjam status");
		ArrayList<Korisnik> korisnici = Data.getInstance().getKorisnici();
		for(Korisnik k0 : korisnici){
			if(k0.getUsername().equals(username)){
				k0.setUloga(Uloga.ADMIN);
				JsonSerializer.saveData();
				return Response.ok(k0, MediaType.APPLICATION_JSON).build();					
			}
		}
		return Response.ok(null, MediaType.APPLICATION_JSON).build();
	}
	
	
//pomocne metode	
	private boolean checkIfUnique(String username) {
		ArrayList<Korisnik> k = Data.getInstance().getKorisnici();
		for(Korisnik k0 : k){
			if(k0.getUsername().equals(username))
				return false;
		}
		return true;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Korisnik> getAll(){
		return Data.getInstance().getKorisnici();
	}
}
