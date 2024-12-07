import { prisma } from './db';
import { Tool as PrismaTool } from '@prisma/client';
import { Tool } from '../types/tool';

export async function getAllTools(): Promise<Tool[]> {
  const tools = await prisma.tool.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  
  return tools.map(parseTool);
}

export async function getToolById(id: string): Promise<Tool | null> {
  const tool = await prisma.tool.findUnique({
    where: { id },
  });
  
  return tool ? parseTool(tool) : null;
}

export async function getToolsByCategory(category: string): Promise<Tool[]> {
  const tools = await prisma.tool.findMany({
    where: { category },
    orderBy: {
      createdAt: 'desc',
    },
  });
  
  return tools.map(parseTool);
}

export async function searchTools(query: string): Promise<Tool[]> {
  const tools = await prisma.tool.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { description: { contains: query } },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  
  return tools.map(parseTool);
}

function parseTool(tool: PrismaTool): Tool {
  return {
    ...tool,
    features: JSON.parse(tool.features),
    screenshots: JSON.parse(tool.screenshots),
    pros: JSON.parse(tool.pros),
    cons: JSON.parse(tool.cons),
    bestFor: JSON.parse(tool.bestFor),
    pricing: tool.pricing as Tool['pricing'],
  };
}