package com.software.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.validator.PublicClassValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.software.topservice.SaleOrderManagerService;
import com.software.trans.ReceiveOrder;
import com.software.trans.SendOrder;

@RestController
@RequestMapping("/order")
public class OrderController 
{
	@Autowired
	private	SaleOrderManagerService service;
	
	@RequestMapping("/query")
	public List<SendOrder> queryOrder(@RequestBody ReceiveOrder param)
	{
		System.out.println(param.getClientid());
		List<SendOrder> result = service.select(param);
		return result;//返回查找结果
	}
	
	@RequestMapping("/insert")
	public Map<String,String> insertOrder(@RequestBody List<ReceiveOrder> param)
	{
		System.out.println("insert");
		System.out.println(param);
		if (param.size()==0) 
		{
			return null;
		}
		System.out.println(param.get(0).toString());
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		String createtime = df.format(new Date());// new Date()为获取当前系统时间
		param.get(0).setCreatetime(createtime);
		String infovalue = service.insert(param);
		Map<String,String> result = new HashMap<String,String>();
		result.put("info", infovalue);
		return result;//返回成功/失败信息
	}
	
	@RequestMapping("/update")
	public Map<String,String> updateOrder(@RequestBody List<ReceiveOrder> param)
	{
		
		String infovalue = service.update(param);
		Map<String,String> result = new HashMap<String,String>();
		result.put("info", infovalue);
		return result;//返回成功/失败信息
	}
	
	@RequestMapping("/delete")
	public String deleteOrder(@RequestBody ReceiveOrder param){
		service.delete(param);;
		return "success";//返回成功/失败信息
	}
	
	@RequestMapping("/check")
	public Map<String,String> checkOrder(@RequestBody ReceiveOrder param){
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		String checktime = df.format(new Date());// new Date()为获取当前系统时间
		param.setChecktime(checktime);
		param.setStatus("4");
		
		String infovalue = service.checkOrder(param);
		Map<String,String> result = new HashMap<String,String>();
		result.put("info", infovalue);
		System.out.println("11111"+result);
		return result;//返回成功/失败信息
	}
	
	@RequestMapping("/pay")
	public Map<String,String> payOrder(@RequestBody ReceiveOrder param)
	{
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		String gathertime = df.format(new Date());// new Date()为获取当前系统时间
		param.setGathertime(gathertime);
		param.setStatus("5");
		
		service.payOrder(param);
		
		Map<String,String> result = new HashMap<String,String>();
		result.put("info", "收款成功");
		return result;//返回成功/失败信息
	}
	
	@RequestMapping("/return")
	public Map<String,String> returnOrder(@RequestBody ReceiveOrder param){
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		String returntime = df.format(new Date());// new Date()为获取当前系统时间
		param.setReturntime(returntime);
		param.setStatus("6");
		
		service.returnOrder(param);
		
		Map<String,String> result = new HashMap<String,String>();
		result.put("info", "退货成功");
		return result;//返回成功/失败信息
	}
	
}