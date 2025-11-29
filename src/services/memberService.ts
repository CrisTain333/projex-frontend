import { api } from './api';
import { Member, Invite, CreateInviteDTO, UpdateMemberRoleDTO, ApiResponse, ListResponse } from '@/types';

export const memberService = {
  // Project Members
  async getByProject(projectId: string): Promise<Member[]> {
    const response = await api.get<ListResponse<Member>>(`/projects/${projectId}/members`);
    return response.data.data;
  },

  async getBySpace(spaceId: string): Promise<Member[]> {
    const response = await api.get<ListResponse<Member>>(`/spaces/${spaceId}/members`);
    return response.data.data;
  },

  async updateRole(memberId: string, data: UpdateMemberRoleDTO): Promise<Member> {
    const response = await api.patch<ApiResponse<Member>>(`/members/${memberId}/role`, data);
    return response.data.data;
  },

  async remove(memberId: string): Promise<void> {
    await api.delete(`/members/${memberId}`);
  },

  // Invites
  async getInvites(projectId: string): Promise<Invite[]> {
    const response = await api.get<ListResponse<Invite>>(`/projects/${projectId}/invites`);
    return response.data.data;
  },

  async createInvite(data: CreateInviteDTO): Promise<Invite> {
    const response = await api.post<ApiResponse<Invite>>('/invites', data);
    return response.data.data;
  },

  async revokeInvite(inviteId: string): Promise<void> {
    await api.delete(`/invites/${inviteId}`);
  },

  async resendInvite(inviteId: string): Promise<Invite> {
    const response = await api.post<ApiResponse<Invite>>(`/invites/${inviteId}/resend`);
    return response.data.data;
  },

  async acceptInvite(token: string): Promise<{ member: Member }> {
    const response = await api.post<ApiResponse<{ member: Member }>>(`/invites/accept/${token}`);
    return response.data.data;
  },

  async getInviteByToken(token: string): Promise<Invite> {
    const response = await api.get<ApiResponse<Invite>>(`/invites/token/${token}`);
    return response.data.data;
  },
};
