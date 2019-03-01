from django import template
from ..models import Segmento, segmento_horario, Telefono_emisora, frecuencia_publicidad, Alternativa, segmento_usuario

register = template.Library()

# Devuelve los horarios de un segmento
@register.simple_tag
def get_horarios(segmento):
    return segmento_horario.objects.filter(idSegmento=segmento.id)

# Devuelve la cantidad de segmentos de una emisora
@register.simple_tag
def get_cant_segmentos(emisora):
    return Segmento.objects.filter(idEmisora=emisora, activo='A').count()

# Devuelve la cantidad de locutores de una emisora
@register.simple_tag
def get_cant_locutores(emisora):
    count = 0
    list_segmentos = Segmento.objects.filter(idEmisora=emisora)
    for segmento in list_segmentos:
        count += segmento_usuario.objects.filter(idSegmento=segmento).count()
    return count

# Devuelve el teléfono de una emisora
@register.simple_tag
def get_telf_emisora(emisora):
    return Telefono_emisora.objects.filter(idEmisora=emisora)

@register.simple_tag
def get_frecuencias(publicidad):
	return frecuencia_publicidad.objects.filter(idPublicidad=publicidad.id)

@register.simple_tag
def get_alternativas(pregunta):
    return Alternativa.objects.filter(idPregunta=pregunta)
