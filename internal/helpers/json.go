package helpers

func Error( msg string ) string {
	return "{ \"error\": \"" + msg + "\" }"
}

func Status( msg string ) string {
	return "{ \"status\": \"" + msg + "\" }"
}