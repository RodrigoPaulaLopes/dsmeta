package com.devsuperior.dsmeta.services;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.repository.SaleRepository;

@Service
public class SaleService {
	
	@Autowired
	private SaleRepository saleRepo;
	
	
	public Page<Sale> findSales(LocalDate min, LocalDate max, Pageable page) {
		return this.saleRepo.findSales(min, max, page);
	}
	
}
