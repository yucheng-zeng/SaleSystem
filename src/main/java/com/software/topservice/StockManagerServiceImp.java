package com.software.topservice;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.software.domain.Item;
import com.software.domain.ItemToPrice;
import com.software.domain.WarehourseDetail;
import com.software.service.ItemService;
import com.software.service.ItemToPriceService;
import com.software.service.WarehourseDetailService;
import com.software.trans.Stock;

@Service
public class StockManagerServiceImp implements StockManagerService 
{
	@Autowired
	private ItemService itemService;
	
	@Autowired
	private WarehourseDetailService detailService;

	@Autowired
	private ItemToPriceService priceService;
	
	@Override
	public List<Stock> select(Stock record) 
	{
		Integer hourseid = Integer.valueOf(record.getHourseid());
		record.fillTablename();  // 计算tablename
		String tablename = record.getTablename();
		Item exampleItem = record.toItem();
		exampleItem.setLabel("valid");
		
		// 查询所有符合条件的商品基本信息
		List<Item> itemList = itemService.select(exampleItem);
		List<Stock> stockList = new ArrayList<Stock>();
		Stock tempStock;
		WarehourseDetail exampleDetail = new WarehourseDetail(); // 用于记录信息，查询
		WarehourseDetail resultDetail;
		for (Item item : itemList) 
		{
			// 设置商品基本信息
			tempStock = new Stock();
			tempStock.initByItem(item);
			tempStock.setHourseid(record.getHourseid());
			tempStock.setTablename(tablename);
			
			// 查取数量信息
			exampleDetail.setItemid(item.getId());
			exampleDetail.setTablename(tablename);
			resultDetail = detailService.selectByPrimaryKey(exampleDetail);
			System.out.println(resultDetail);
			
			// 设置商品数量信息
			tempStock.initByDetail(resultDetail);
			
			// 获取挤压的价格信息
			tempStock.setOverstock(String.format("%.2f", resultDetail.getItemnum()*getItemPrice(item.getId(), hourseid)));
			
			stockList.add(tempStock);
		}
		return stockList;
	}

	@Override
	public void update(List<Stock> record) 
	{
		WarehourseDetail exampleDetail;
		for (Stock stock : record) 
		{
			stock.fillTablename();
			exampleDetail = stock.toDetail();
			detailService.updateByPrimaryKey(exampleDetail);
		}
	}
	
	private float getItemPrice(Integer itemid, Integer hourseid)
	{
		ItemToPrice examplePrice = new ItemToPrice();
		String priceTablename;
		if (hourseid==-1) 
		{
			priceTablename = "base_warehourse_itemtoprice";
		}
		else
		{
			priceTablename = "sub_warehourse_itemtoprice_"+String.format("%04d", hourseid);
		}
		examplePrice.setTablename(priceTablename);
		examplePrice.setId(itemid);
		return priceService.selectByPrimaryKey(examplePrice).getPurchaseprice();
	}
}
