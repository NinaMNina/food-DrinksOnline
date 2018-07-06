package controller;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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
import bean.Restoran;

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
}
