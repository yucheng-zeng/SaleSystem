package com.software.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.software.topservice.ItemManagerSerivce;
import com.software.trans.ReceiveCargo;

@RestController
@RequestMapping("/cargo")
public class CargoController {
	
	@Autowired
	private ItemManagerSerivce service;
	@RequestMapping("/queryById")
	public ReceiveCargo queryCargoById(@RequestBody ReceiveCargo param)
	{
		param.setLabel("valid");
		ReceiveCargo result = service.selectByPrimaryKey(param);
		return result;
	}
	
	@RequestMapping("/query")
	public List<ReceiveCargo> queryCargo(@RequestBody ReceiveCargo param)
	{
		System.out.println("ID    "+param.getId());
		System.out.println("hourseID"+ param.getTablename());
		param.setLabel("valid");
		List<ReceiveCargo> result = service.select(param);
		System.out.println(result.size());
		for(ReceiveCargo r:result){
			System.out.println(r.toString());
		}
		return result;
	}
	
	@RequestMapping("/add")
	public Map<String, String> addCargo(@RequestBody ReceiveCargo param){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		String date = df.format(new Date());// new Date()为获取当前系统时间
		
		param.setLabel("valid");
		param.setTime(date);
		service.insertSelective(param);
		
		Map<String,String> result = new HashMap<String,String>();
		result.put("info", "添加成功");
		return result;
	}
	
	@RequestMapping("/delete")
	public Map<String, String> deleteCargo(@RequestBody ReceiveCargo param)
	{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		String date = df.format(new Date());// new Date()为获取当前系统时间
		param.setTime(date);
		param.setLabel("invalid");
		
		String infovalue = service.deleteByPrimaryKey(param);
		Map<String,String> result = new HashMap<String,String>();
		result.put("info", infovalue);
		return result;
	}
	
	@RequestMapping("/update")
	public Map<String, String> updateCargo(@RequestBody ReceiveCargo param){
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		String date = df.format(new Date());// new Date()为获取当前系统时间
		param.setTime(date);
		param.setLabel("valid");
		service.updateByPrimaryKeySelective(param);
		
		Map<String,String> result = new HashMap<String,String>();
		result.put("info", "更新成功");
		return result;
	}
	
	public Map<Integer, String> typeMenu()
	{
		return service.typeMenu();
	}
}
