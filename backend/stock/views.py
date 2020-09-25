from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from .serializers import UserSerializer, GroupSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer



class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    
    @api_view(('GET',))
    # @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
    def list(self):
        factory = APIRequestFactory()
        request = factory.get('/')

        serializer_context = {
            'request': Request(request),
        }
        queryset = User.objects.all()
        serializer = UserSerializer(instance=queryset, context=serializer_context, many=True)
        return Response(serializer.data)

    @api_view(['POST'])
    def current_user(request):
        queryset = User.objects.get(username=request.data['username'])
        serializer = UserSerializer(queryset)
        return Response(serializer.data)

    @api_view(['POST'])
    def update_user(request):
        queryset = User.objects.get(id=request.data['userId'])
        queryset.username = request.data['username']
        queryset.email = request.data['email']
        queryset.first_name = request.data['firstname']
        queryset.last_name = request.data['lastname']
        queryset.set_password(request.data['password'])
        queryset.save()
        return Response()

    def retrieve(self, request):
        queryset = User.objects.all()
        user = get_object_or_404(queryset)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
