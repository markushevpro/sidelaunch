// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {options} from '../models';
import {app} from '../models';
import {frontend} from '../models';
import {system} from '../models';

export function CheckFile(arg1:string):Promise<string>;

export function CheckURL(arg1:string):Promise<string>;

export function ConfirmFolderRemove(arg1:string):Promise<void>;

export function EditItem(arg1:string):Promise<void>;

export function ExtractIcon(arg1:string,arg2:string):Promise<string>;

export function ExtractLink(arg1:string):Promise<string>;

export function Focus(arg1:options.SecondInstanceData):Promise<void>;

export function GetPageData():Promise<app.PageData>;

export function LoadConfig():Promise<string>;

export function LoadLibrary():Promise<string>;

export function OpenDir(arg1:string):Promise<string>;

export function OpenFile(arg1:string,arg2:Array<frontend.FileFilter>):Promise<string>;

export function OpenURL(arg1:string):Promise<void>;

export function ReadUrlFile(arg1:string):Promise<system.UrlData>;

export function RunExecutable(arg1:string,arg2:string,arg3:string):Promise<void>;

export function SaveConfig(arg1:string):Promise<string>;

export function SaveIcon(arg1:string,arg2:string):Promise<string>;

export function SaveLibrary(arg1:string):Promise<string>;

export function ShowSettings():Promise<void>;

export function SystemError(arg1:frontend.DialogType,arg2:string,arg3:string):Promise<void>;
