package controller;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import jsonData.Data;
import jsonData.JsonSerializer;
import DTO.KorisnikDTO;
import bean.Korisnik;

@Path("/korisnik")
public class KorisnikController {
	
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
