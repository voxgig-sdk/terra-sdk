package core

type TerraError struct {
	IsTerraError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTerraError(code string, msg string, ctx *Context) *TerraError {
	return &TerraError{
		IsTerraError: true,
		Sdk:              "Terra",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TerraError) Error() string {
	return e.Msg
}
